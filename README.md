# NodeJS-BlockChain
Simple code to show the creation and 'Proof-of-work' of a blockchain.

This is a very simple implementation of a BlockChain.

**This is not a secure BlockChain and has many limitations.**

Run the below command when inside the BlockChain directory to initalize your code with necessary modules.
> npm install --save crypto-js

For the 'Proof-Of-Work' i have set the difficulty to 5.
In an actual BlockChain the difficulty is usually set to 15+.
The difficulty shows the number of zeroes the hash should begin with.
The higher the difficulty, the more time each block will take to get mined.  

In `line 85` i have tried to tamper with the data of a Block in the chain, this is not so easy in the real world.
I have done it simply to show the integrity of the chain upon tampering!!

Running the Code 

>node blockchain.js

Here is a screenshot of the output.

![Screenshot](https://github.com/roshan139154/NodeJS-BlockChain/blob/master/Screenshot/Output_Screenshot.png)
