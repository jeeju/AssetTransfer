# cc126 - Blockchain Asset Depository

This repository holds code for the competitive analysis team working on blockchain.

### Use Case

Assets such as financial securities must be able to be dematerialized on a blockchain network so that all stakeholders of an asset type will have direct access to that asset, allowing them to initiate trades and acquire information on an asset without going through layers of intermediaries. Trades should be settled in near real time and all stakeholders must be able to access asset information in near real time. A stakeholder should be able to add business rules on any given asset type, as one example of using automation logic to further reduce operating costs.

### Persona

Investor – Beneficial and legal owner of an asset.

Issuer – Business entity that issued the asset which is now dematerialized on the ledger network.

Custodian – Hired by investors to manage their assets, and offer other value-add services on top of the assets being managed.

Securities Depository – Depository of dematerialized assets.

### Key Components

Asset to cash - Integration with off-chain payment systems is necessary so that issuers can make payments to and receive payments from investors.

Reference Rate - Some types of assets (such as floating rate notes) may have attributes linked to external data (such as reference rate), and such information must be fed into the ledger network.

Asset Timer - Many types of financial assets have predefined life spans and are required to make periodic payments to their owners, so a timer is required to automate the operation management of these assets.

Asset Auditor - Asset transactions must be made auditable to third parties. For example, regulators may want to audit transactions and movements of assets to measure market risks.

Obfuscation of account balances - Individual account balances must be obfuscated so that no one can deduce the exact amount that an investor owns.

Validation Access – Only nodes with validation rights are allowed to validate transactions that update the balances of an asset type (this could be restricted to CSD and/or the issuer).

View access – Only accounts with view access rights are allowed to interrogate the chaincode that defines an asset type. If an asset represents shares of publicly traded companies, then the view access right must be granted to every entity on the network.

