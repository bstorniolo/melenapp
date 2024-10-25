
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2021-06-15' = {
    name: 'my-cosmos-account'
    location: 'eastus'
    kind: 'GlobalDocumentDB'
    properties: {
      databaseAccountOfferType: 'Standard'
      locations: [
        {
          locationName: 'eastus'
          failoverPriority: 0
          isZoneRedundant: false
        }
      ]
      isFreeTierEnabled: true  // Ensure the free tier is enabled
    }
  }
  
  resource database 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2021-06-15' = {
    name: 'my-database'
    parent: cosmosAccount
    properties: {
      throughput: 400 // Free tier, lowest option
    }
  }
  
  resource container 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2021-06-15' = {
    name: 'my-container'
    parent: database
    properties: {
      partitionKey: {
        paths: ['/category']
        kind: 'Hash'
      }
    }
  }
  
  output cosmosEndpoint string = cosmosAccount.properties.documentEndpoint
  output cosmosPrimaryKey string = listKeys(cosmosAccount.id, '2021-06-15').primaryMasterKey
  