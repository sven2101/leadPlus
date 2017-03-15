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

import org.springframework.stereotype.Service;

import dash.common.HtmlCleaner;

@Service
public class HtmlToPdfService {

	public static final String PHANTOMJS_ROOT_DIR = "/phantomjs-2.1.1-windows";
	public static final String PHANTOMJS_CONFIG_FILE = PHANTOMJS_ROOT_DIR + "/phantomjs.config.js";
	public static final String PHANTOMJS_EXE = PHANTOMJS_ROOT_DIR + "/phantomjs.exe";
	public static final String TEMP_DIR = PHANTOMJS_ROOT_DIR + "/temp";

	public synchronized byte[] genereatePdfFromHtml(String htmlString)
			throws PdfGenerationFailedException, IOException {

		int exitCode = 0;
		BufferedReader errorReader = null;
		InputStreamReader inputStreamReader = null;
		PrintWriter writer = null;
		File tempHtml = null;
		File tempPdf = null;
		String errorConsoleOutput = "";
		Process phantom = null;

		try {
			// String tempDirUrl =
			// this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath()+
			// TEMP_DIR;

			String tempDirUrl = this.getClass().getResource(TEMP_DIR).getPath();

			tempHtml = File.createTempFile("tempHtml", ".html", new File(tempDirUrl));
			writer = new PrintWriter(tempHtml);
			writer.print(HtmlCleaner.cleanHtml(htmlString));
			writer.close();

			String configFileUrl = this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath()
					+ PHANTOMJS_CONFIG_FILE;
			File configFile = Paths.get(new URI("file:" + configFileUrl)).toFile();

			tempPdf = File.createTempFile("tempPdf", ".pdf", new File(tempDirUrl));

			String exeUrl = this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath()
					+ PHANTOMJS_EXE;
			ProcessBuilder renderProcess = new ProcessBuilder(exeUrl, configFile.getAbsolutePath(),
					tempHtml.getAbsolutePath(), tempPdf.getAbsolutePath());
			phantom = renderProcess.start();

			long now = System.currentTimeMillis();
			long timeoutInMillis = 1000L * 10;
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

}
