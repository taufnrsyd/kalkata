# Kalkata

Inspired by one of coding interviews I did, this app takes in numbers and translates them into Indonesian words.

## Objective

The app's main objective is to display the accuracy of translation of the numbers to Indonesian words. Hence you would find some unusual UX within the app.

### Number format

The app only process integers and no floats at all. In the event when the calculation resulted in a float, it would be rounded using `Math.round()`. The app does use signed integer for the calculation result, albeit not for the calculation input.

### Features

As explained above, the app does not provide full blown calculator features such as setting the number's sign. It only supports basic operations: **division**, **multiplication**, **subtraction**, and **addition**.

## License

You are free to fork this project and make your own version of the calculator. Nonetheless, a tribute to this me ([@taufnrsyd](https://github.com/taufnrsyd)) or this [repo](https://github.com/taufnrsyd/kalkata) is very much appreciated.

Note that this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), so you might want to familiarize yourself with the tool in case you haven't.

### Attribution

The UI of the app is heavily based on [this Dribble](https://dribbble.com/shots/2311064-Calculator) by [Oleg Frolov](http://volorf.dribbble.com/).
