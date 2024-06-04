"use strict";
const dotenv = require("dotenv");
const Server = require("./models/server");
const TransbankSdkNode = require('transbank-sdk-node');
const { options, wpPlus } = require('./transbank/transbank.config');

// Configurar dotenv
dotenv.config();

// Crear instancia del servidor
const server = new Server();

// Configurar Transbank
const integrationType = TransbankSdkNode.IntegrationType.MOCK;
const commerceCode = '597044444405';
const privateKey = TransbankSdkNode.common.mocks.mockPrivateKey;
const publicCert = TransbankSdkNode.common.mocks.mockCert;

const transbankoptions = TransbankSdkNode.Options.ForIntegration(integrationType, commerceCode, privateKey, publicCert);
const wpPlus = new TransbankSdkNode.WebpayPlus(transbankoptions);

// Iniciar transacción de prueba
const buyOrder = '12345';
const sessionId = '123456789';
const amount = 10000;
const returnUrl = 'https://micomercio.cl/endPayment';

wpPlus.initTransaction(amount, buyOrder, sessionId, returnUrl)
    .then(response => {
        const redirectUrl = wpPlus.getRedirectUrl(response);
        console.log(redirectUrl);
        // Código adicional para manejar la URL de redireccionamiento
    })
    .catch(error => {
        console.error(error);
    });