# How to Build a Staking Dapp

[goto study](https://docs.alchemy.com/docs/how-to-build-a-staking-dapp) 

[The relation project](https://github.com/chenym1992/challenge-decentralized-staking)

## Challenge Time!

Okay, now time for the best part. I'm going to leave you with a few extension challenges to try on your own, to see if you fully understand what you've learned here!

1. Update the interest mechanism in the Staker.sol contract so that you receive a "non-linear" amount of ETH based on the blocks between deposit and withdrawal

2. Allow users to deposit any arbitrary amount of ETH into the smart contract, not just 0.5 ETH.

3. Instead of using the vanilla ExampleExternalContract contract, implement a function in Staker.sol that allows you to retrieve the ETH locked up in ExampleExternalContract and re-deposit it back into the Staker contract.

Make sure to only "white-list" a single address to call this new function to gate its usage!
Make sure that you create logic/remove existing code to ensure that users are able to interact with the Staker contract over and over again! We want to be able to ping-pong from Staker -> ExampleExternalContract repeatedly!