package nl.han.ngi.projectportalbackend.core.services;

import nl.han.ngi.projectportalbackend.core.models.Status;
import nl.han.ngi.projectportalbackend.core.models.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    public List<Status> getAll() {
        return statusRepository.getAll();
    }
}
