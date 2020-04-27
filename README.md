# Appymeal Backend

## Build Instructions
The server must be running docker and docker compose, this application uses docker compose for the build. Run these commands to build and run the application.

<ol>
    <li>git clone https://github.com/mhanberry1/appymeal-backend.git</li>
    <li>cd /appymeal-backend</li>
    <li>docker-compose up --build</li>
</ol>

## Software Stack
Nginx - used as a reverse proxy server <br />
Nodejs - runtime environment that executes JavaScript code <br />
Expressjs - a web application framework <br />
Redis - an in memory data structure used as the database <br />

## Additional Notes
This is the api for the appymeal app it can only be accessed by the appymeal client because it sits behind an Nginx reverse proxy

## Stripe Payments
Ther are two types of users that will be accessing the these routes, that would be the buyer and the provider (restaurant).
These are the steps for each of those types of users

<b>Provider:</b>
<ol>
    <li>Register the restaurant using this endpoint: Add Restaurant <b>http://localhost/api/restaurant/add</b></li>
    <li>Create a stripe connected account: Stripe Create Account <b>http://localhost/stripe/v1/create_account</b></li>
    <li>Add the restaurants bank account and attach connected account: Stripe Create Ex. Bank Acc. <b>http://localhost/stripe/v1/create_ex_bank_acc</b></li>
</ol>

<b>Customer:</b>

If the customer does not already have a payment method, take these steps first.
<ol>
    <li>Create a payment method using this endpoint: Stripe Create Payment Method <b>http://localhost/stripe/v1/create_payment</b></li>
    <li>Attach the customer to the payment method: Stripe Attach Payment Method to Customer <b>http://localhost/stripe/v1/attach_payment_cus</b></li>
</ol>

If the customer already has a payment method, take these steps.
<ol>
    <li>Get the customer's payment method: Stripe Retrieve a Payment Method <b>http://localhost/stripe/v1/retrieve_payment/{PAYMENT_METHOD_ID}</b></li>
    <li>Get the provider's account ID: Stripe Retrieve Account <b>http://localhost/stripe/v1/retrieve_account</b></li>
    <li>Create a payment intent: Stripe Create Payment Intent <b>http://localhost/stripe/v1/create_paymentIntent</b></li>
    <li>Confirm the payment to the provider: Stripe Confirm Payment Intent <b>http://localhost/stripe/v1/confirm_paymentIntent</b></li>
</ol>

