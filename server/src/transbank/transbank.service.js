// src/transbank/transbank.service.js
import { wpPlus } from './transbank.config';

// Funciones o métodos para interactuar con Transbank
const initTransaction = (amount, buyOrder, sessionId, returnUrl) => {
    return wpPlus.initTransaction(amount, buyOrder, sessionId, returnUrl)
        .then(response => {
            const redirectUrl = wpPlus.getRedirectUrl(response);
            return redirectUrl;
        })
        .catch(error => {
            throw error;
        });
};

// Exportar las funciones o métodos del servicio
export { initTransaction };