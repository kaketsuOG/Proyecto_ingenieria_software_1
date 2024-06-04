// src/transbank/transbank.config.js
const TransbankSdkNode = require('transbank-sdk-node');

const integrationType = TransbankSdkNode.IntegrationType.MOCK;
const commerceCode = '597044444405';
const privateKey = TransbankSdkNode.common.mocks.mockPrivateKey;
const publicCert = TransbankSdkNode.common.mocks.mockCert;

const options = TransbankSdkNode.Options.ForIntegration(integrationType, commerceCode, privateKey, publicCert);
const wpPlus = new TransbankSdkNode.WebpayPlus(options);

module.exports = { options, wpPlus };
