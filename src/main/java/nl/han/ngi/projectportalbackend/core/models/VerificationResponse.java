package nl.han.ngi.projectportalbackend.core.models;

import nl.han.ngi.projectportalbackend.core.enums.VerificationStatus;

public class VerificationResponse {
    private VerificationStatus status;

    public VerificationResponse(VerificationStatus status){
        this.status = status;
    }

    public VerificationStatus getStatus() {
        return status;
    }

    public void setStatus(VerificationStatus status) {
        this.status = status;
    }
}
