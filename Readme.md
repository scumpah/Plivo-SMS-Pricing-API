API Documentation:

Name: Plivo SMS Pricing API
Author: Raghavendra Sai

Stack: Node- Express
DB: Mongo
Server: localhost
port: 27017
databasename: plivomaster

Collections:

Countries ---- To maintain countryname,countrycode,currency
numberTypes ---- Phone number, Dial-in.....
pricing ---- countrycode, numbertypecode and price (For this use case numberTypeCode is optional)


Services ---

Countries:
    get all countries:
        Method: GET
        path: http://localhost:3000/api/country
    
    add a country:
        Method: POST
        path: http://localhost:3000/api/country
        body: {
	            "countryName": "test",
                "countryCode": "test",
                "currencyType": "test"
              }

    get a country by countryCode:
        Method: GET
        path: http://localhost:3000/api/country/test


Number Types :

    get all numbertypes:
        Method: GET
        path: http://localhost:3000/api/numbertype
    
    add a numbertype:
        Method: POST
        path: http://localhost:3000/api/numbertype
        body: {
	            "name": "test",
                "code": "test",
              }

    get a numbertype by numbertypecode:
        Method: GET
        path: http://localhost:3000/api/numbertype/test


Pricing :

    get all pricings available:
        Method: GET
        path: http://localhost:3000/api/pricing
    
    add a pricing:
        Method: POST
        path: http://localhost:3000/api/pricing
        body: {
                "numberTypeCode": "test1",
                "countryCode": "test",
                "price":4
              }

    calculate pricings:
        Method: post
        path: http://localhost:3000/api/pricing/calculatepricing
        body: {
                "numberTypeCode": "test1",
                "countryCode": "test",
                "smsType": "both/inbound/outbound",
                "number": 100
              }


All create endpoints are created to add records easily into the database
All get endpoints can be used to retrieve data to UI so that changes can be maintained in database layer and any changes in the values doesn't involve code change/deployment
All request payloads are validated using Joi validator to maintain consistency
Error logging
Appropriate response codes/messages(201- created, 400- Bad request, 200- Transaction success, 500- Exception)

# Plivo-SMS-Pricing-API
