# MERN-Ecommerce-site-BuyItNow.com

## Home page
![Home_page](https://user-images.githubusercontent.com/105007678/235343043-422cce3f-b154-496d-ae99-fd00428f38ad.png)

## Cart page
![Cart_page](https://user-images.githubusercontent.com/105007678/235343094-ba1ef489-7c8f-41b8-b5ed-c2a494a53035.png)

## Admin permissions
![Admin_panel](https://user-images.githubusercontent.com/105007678/235343113-1e253fb0-2825-4a62-81cd-65e0f5c77994.png)

## User permissions
![User_dashboard](https://user-images.githubusercontent.com/105007678/235343125-07aa3597-a03f-441e-ae23-b0852349498b.png)

## Braintree transaction tracking
![braintree_transaction](https://user-images.githubusercontent.com/105007678/235343136-a7d8bcc7-6389-4edc-950f-9b4c47d017d2.png)

## Database - mongoDB
![Database](https://user-images.githubusercontent.com/105007678/235343280-6e8977d9-5811-4ea7-8b14-8fdc0e0b8114.png)


## After you clone this repository, to 2 things first:
1. Make a ".env" file in 'root' directory and make 5 variables as given below:
  - MONGO_URL - // enter your own mongo db url without quotes //
  - JWT_SECRET - // enter any random key around 15-20 characters without quotes//
  - BRAINTREE_MERCHANT_ID - // enter your own braintree merchant id without quotes //
  - BRAINTREE_PUBLIC_KEY - // enter your own braintree public key without quotes //
  - BRAINTREE_PRIVATE_KEY - // enter your own braintree private key without quotes //
2. Make a ".env" file in 'client' directory and make 1 variable as given below:
  - REACT_APP_API = http://localhost: //set port number you like//
