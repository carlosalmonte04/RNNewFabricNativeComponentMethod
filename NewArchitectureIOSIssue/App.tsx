import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	View,
} from 'react-native';
import RTNCenteredText, {Commands} from 'rtn-centered-text/js/RTNCenteredTextNativeComponent';

export default class App extends Component<{}> {
	ref: React.ElementRef<typeof RTNCenteredText> | undefined;

	constructor(props:any) {
		super(props);
		this.state = { 
			centeredTextReference: null,
		};

		this.captureRef = this.captureRef.bind(this);
	}

	log(message:string) {
		console.log("[*** " + message);
	}

	captureRef (ref: React.ElementRef<typeof RTNCenteredText>) {
		this.log("Capturing reference ref: " + ref + " this.ref: " + this.ref);
		this.ref = ref;
		this.log("Capturing reference ref: " + ref + " this.ref: " + this.ref);
	  }

	render() {
		return (
			<View style={styles.container}>	
				<RTNCenteredText
				ref={this.captureRef}
				text="Hello there!"
				style={styles.nativeText}
				/>
				<Button
        			title="Trigger native method"
					onPress={
						() => {
							this.log("Trigger native method");
							if(this.ref) {
								this.log("Reference is not null " + this.ref);
								Commands.trigger(this.ref);
							} else {
								this.log("Reference null");
							}
						}
				 	}
      			/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
	},
	nativeText: {
		width: '100%', 
		height: 30
	}
});