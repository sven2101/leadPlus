package dash.processmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dash.processmanagement.status.Status;
import dash.processmanagement.Process;

@Service
public interface IProcessService {

    public List<?> getElementsByStatus(Status status, String kind);
    public void createProcesses(List<Process>processes);
}
