This application was part of one of the most challenging lessons at my course formation.

It is designed to integrate all physical components present in a common desktop software infrastructure.

We took this to another level, by using Angular as the front end, the application needed to access thermal printers, scanners, RFID scanners, balances, and others.

With Java and Spring, we managed the API requests using REST.

The stream of process: User comes into a bar and receives an RFID card, when the user selects a possible item, he put his card close to the RFID scanner, the application will identify his card and add the item to his orders.

The orders are hold by the RFID card. When the user wants to leave, he can put his card close to another scanner that will send a request to the API and retrieves the items that the user has to pay.

A receipt is going to be printed by the thermal printer and can be given to the client.

The idea of the project is quite simple, the challenge is to integrate all physical components and make them communicate between.
