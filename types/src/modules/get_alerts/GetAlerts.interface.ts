import IAlert from "../../interfaces/alerts.interface";

interface GetAlerts {
    alerts: IAlert[];
    success: boolean;
}

export default GetAlerts;