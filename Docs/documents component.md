Documents component is a generic component for managing the documents of any category like medicals, financials, travel.
For now (as on Sep 16 2018) Digitallibrary is still independent component but soon to be moved to Documents component.


Documents structure

Category - Example medicals, travel, assets etc
Directory -
user specified directory name. Directory can have subdirectories and entire path should be specified here
Directory in context of Financials will be AccountCategory/BankName/AccountHolder
Directory in context of Medicals will be Patientname/Incident/
Directory in context of Assets will be AssetType/AssetName
Directory in context of Travel will be TripName

Metadata - document metadata in JSON format. This includes metadata such as linked person, file properties, pdf properties, MS document properties etc.
OriginalFileName - original file name used at the time of import
MimeType
Source - sources of the document. It can be email, PC upload, mobile upload or USB import
Size - file size
Container -
ImportDate -
Path - path in storage
Status -

