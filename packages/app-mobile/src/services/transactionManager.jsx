import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

export const updateDedicoins = async (userId, amount) => {
    try {
        const response = await axiosApiInstance.post(backendUrl + "payments/create-transaction", {
            userId,
            amount,
        });
        return response.data.user.dediCoins;
    } catch (error) {
        console.error("Erreur lors de la mise à jour des dedicoins:", error);
        return null;
    }
};