import IUser from "../../interfaces/user.interface"

type ILoginResponse = {
    user?: IUser;
    success: boolean;
    message?: string;
}

export default ILoginResponse