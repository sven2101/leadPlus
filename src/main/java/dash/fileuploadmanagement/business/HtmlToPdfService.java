package dash.fileuploadmanagement.business;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

import dash.common.HtmlCleaner;
import dash.common.OSValidator;

@Service
public class HtmlToPdfService {

	public static final String PHANTOMJS_ROOT_DIR = getRootPath() + "/phantomjs";
	public static final String PHANTOMJS_CONFIG_FILE = PHANTOMJS_ROOT_DIR + "/phantomjs.config.js";
	public static final String PHANTOMJS_EXE = PHANTOMJS_ROOT_DIR + "/" + OSValidator.getOS() + "/phantomjs";
	public static final String TMP_DIR = PHANTOMJS_ROOT_DIR + "/tmp";

	private static String getRootPath() {
		String path = System.getProperty("user.dir").replaceAll("\\\\", "/");
		String className = HtmlToPdfService.class.getName().replace('.', '/');
		String classJar = HtmlToPdfService.class.getResource("/" + className + ".class").toString();
		if (!classJar.startsWith("jar:")) {
			path += "/elb_config";
		}
		return path;
	}

	public synchronized byte[] genereatePdfFromHtml(String htmlStringWithImageInline)
			throws PdfGenerationFailedException, IOException {

		int exitCode = 0;
		BufferedReader errorReader = null;
		InputStreamReader inputStreamReader = null;
		PrintWriter writer = null;
		File tempHtml = null;
		File tempPdf = null;
		String errorConsoleOutput = "";
		Process phantom = null;
		List<File> files = null;
		try {

			files = new ArrayList<>();
			String htmlString = extractBase64Images(htmlStringWithImageInline, files);

			new File(TMP_DIR).mkdirs();

			tempHtml = File.createTempFile("tempHtml", ".html", new File(TMP_DIR));
			writer = new PrintWriter(tempHtml);
			writer.print(HtmlCleaner.cleanHtmlForPdf(htmlString));
			writer.close();

			File configFile = null;
			if (OSValidator.isWindows()) {
				configFile = Paths.get(new URI("file:/" + PHANTOMJS_CONFIG_FILE)).toFile();
			} else {
				configFile = Paths.get(new URI("file://" + PHANTOMJS_CONFIG_FILE)).toFile();
			}

			tempPdf = File.createTempFile("tempPdf", ".pdf", new File(TMP_DIR));

			ProcessBuilder renderProcess = new ProcessBuilder(PHANTOMJS_EXE, configFile.getPath(), tempHtml.getPath(),
					tempPdf.getPath());
			phantom = renderProcess.start();

			long now = System.currentTimeMillis();
			long timeoutInMillis = 1000L * 60;
			long finish = now + timeoutInMillis;
			while (isAlive(phantom) && (System.currentTimeMillis() < finish)) {
				Thread.sleep(100);
			}
			if (isAlive(phantom)) {
				phantom.destroy();
				throw new InterruptedException("Process timeout");
			}

			exitCode = phantom.waitFor();
			/*
			 * BufferedReader debugReader = new BufferedReader(new
			 * InputStreamReader(phantom.getInputStream())); StringBuilder
			 * debugBuilder = new StringBuilder(); String debugLine = null;
			 * while ((debugLine = debugReader.readLine()) != null) {
			 * debugBuilder.append(debugLine);
			 * debugBuilder.append(System.getProperty("line.separator")); }
			 * String debugConsoleOutput = debugBuilder.toString();
			 */
			inputStreamReader = new InputStreamReader(phantom.getErrorStream());
			errorReader = new BufferedReader(inputStreamReader);
			StringBuilder errorBuilder = new StringBuilder();
			String errorLine = null;
			while ((errorLine = errorReader.readLine()) != null) {
				errorBuilder.append(errorLine);
				errorBuilder.append(System.getProperty("line.separator"));
			}
			errorConsoleOutput = errorBuilder.toString();

			Path path = Paths.get(tempPdf.getAbsolutePath());
			if (exitCode != 0) {
				throw new InterruptedException("PhatomJS timeout");
			}
			return Files.readAllBytes(path);
		} catch (Exception e) {
			if (exitCode != 0) {
				throw new PdfGenerationFailedException("PdfGenerator exited with Code " + exitCode);
			}
			e.printStackTrace();
			throw new PdfGenerationFailedException("PdfGenerator exited:" + e.getMessage() + errorConsoleOutput);
		} finally {
			if (inputStreamReader != null) {
				inputStreamReader.close();
			}
			if (errorReader != null) {
				errorReader.close();
			}
			if (writer != null) {
				writer.close();
			}
			if (tempHtml != null) {
				tempHtml.delete();
			}
			if (tempPdf != null) {
				tempPdf.delete();
			}
			if (phantom != null) {
				phantom.destroy();
			}
			if (files != null) {
				files.stream().filter(f -> f != null).forEach(f -> f.delete());
			}
		}

	}

	private static boolean isAlive(Process p) {
		try {
			p.exitValue();
			return false;
		} catch (IllegalThreadStateException e) {
			return true;
		}
	}

	private String extractBase64Images(String oldHtml, List<File> files) throws IOException {
		StringBuilder newContentBuilder = new StringBuilder();
		boolean inImage = false;
		StringBuilder currentBase64ImageStringBuilder = new StringBuilder();
		StringBuilder currentBase64HeaderStringBuilder = new StringBuilder();
		for (int i = 0; i < oldHtml.length(); i++) {
			char c = oldHtml.charAt(i);
			if (inImage) {
				if (c != '"') {
					currentBase64ImageStringBuilder.append(c);
				} else {
					File tempImage = File.createTempFile("tempImage", ".png", new File(TMP_DIR));
					org.apache.commons.codec.binary.Base64
							.decodeBase64(currentBase64ImageStringBuilder.toString().getBytes());
					byte[] imageAsByteArray = org.apache.commons.codec.binary.Base64
							.decodeBase64(currentBase64ImageStringBuilder.toString().getBytes());
					FileUtils.writeByteArrayToFile(tempImage, imageAsByteArray);
					files.add(tempImage);
					currentBase64HeaderStringBuilder = new StringBuilder();
					currentBase64ImageStringBuilder = new StringBuilder();
					newContentBuilder
							.append("src=\"file:///" + tempImage.getAbsolutePath().replaceAll("\\\\", "/") + "\"");
					inImage = false;
				}
				continue;
			}
			if (i + 2 < oldHtml.length() && c == 's' && oldHtml.charAt(i + 1) == 'r' && oldHtml.charAt(i + 2) == 'c') {
				for (; i < oldHtml.length() && oldHtml.charAt(i) != ','; i++) {
					c = oldHtml.charAt(i);
					currentBase64HeaderStringBuilder.append(c);
				}
				inImage = true;
				continue;
			}
			if (!inImage) {
				newContentBuilder.append(c);
			}
		}

		return newContentBuilder.toString();
	}

}
