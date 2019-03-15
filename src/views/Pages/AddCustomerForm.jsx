/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
// @material-ui/core components
import firebase from '../../constant/api/firebase';

// eslint-disable-next-line no-unused-vars
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import ExtendedTablesAddCustomer from '../Tables/ExtendedTablesAddCustomer';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	}
});

class AddCustomerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customer: '',
			password: '',
			phone: '',
			contact: '',
			address: '',
			city: '',
			zip_code: '',
			currency: '',
			firstName: '',
			lastName: '',
			email: '',
			USD: '',
			Country: '',
			Consultant: '',
			ProductOwner: '',
			labelWidth: 0,
			ProductOwnerfirstName: '',
			ProductOwnerlastName: '',
			ProductOwneremail: '',
			ProductOwnerpassword: '',
			ProductOwnerstatus: '',
			status: '',
			type: '',
			rate: '',
			rate_unit: '',
			customercode: '',
			edit: false,
			allcustomers: [],
			users: []
		};
		// firebase.database().ref('Users').on('child_added', (customer) => {
		// 	let currentpost = this.state.allcustomers;

		// 	let obj = {
		// 		all_customers: customer.val(),
		// 		key: customer.key
		// 	};

		// 	currentpost.push(obj);
		// 	this.setState({
		// 		allcustomers: currentpost,
		// 		posts: ''
		// 	});
		// });

		// Binding functions here...!
		// this.deleteCustomer = this.deleteCustomer.bind(this);
	}
	componentWillReceiveProps() {}
	componentDidUpdate() {}
	componentDidMount() {
		// this.updatestate()
		this.setState({
			labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
		});
	}
	// updatestate = () => {
	// 	const { _param } = this.props.location.state;

	// 	console.log('parms', _param);
	// 	if (_param !== '') {
	// 		this.setState({
	// 			customer: _param.all_customers.customer,
	// 			email: _param.all_customers.email,
	// 			phone: _param.all_customers.phone,
	// 			contact: _param.all_customers.contact,
	// 			address: _param.all_customers.address,
	// 			city: _param.all_customers.city,
	// 			zip_code: _param.all_customers.zip_code,
	// 			rate_unit: _param.all_customers.rate_unit,
	// 			Country: _param.all_customers.Country,
	// 			currency: _param.all_customers.currency,
	// 			type: _param.all_customers.type,
	// 			status: _param.all_customers.status,
	// 			customercode: _param.all_customers.customercode,
	// 			rate: _param.all_customers.rate,
	// 		});
	// 	}
	// }

	handleCustomerChange = (e) => {
		this.setState({ customer: e.target.value });
	};
	handleCustomerCodeChange = (e) => {
		this.setState({ customercode: e.target.value });
	};
	handlePassChange = (e) => {
		this.setState({ password: e.target.value });
	};
	handlePhoneChange = (e) => {
		this.setState({ phone: e.target.value });
	};
	handleContactChange = (e) => {
		this.setState({ contact: e.target.value });
	};
	handleAddressChange = (e) => {
		this.setState({ address: e.target.value });
	};
	handleCityChange = (e) => {
		this.setState({ city: e.target.value });
	};
	handleZipChange = (e) => {
		this.setState({ zip_code: e.target.value });
	};
	handleFirstNameChange = (e) => {
		this.setState({ firstName: e.target.value });
	};
	handleLastNameChange = (e) => {
		this.setState({ lastName: e.target.value });
	};
	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	};
	handleProductOwnerFirstNameChange = (e) => {
		this.setState({ ProductOwnerfirstName: e.target.value });
	};
	handleProductOwnerLastNameChange = (e) => {
		this.setState({ ProductOwnerlastName: e.target.value });
	};
	handleProductOwnerEmailChange = (e) => {
		this.setState({ ProductOwneremail: e.target.value });
	};
	handleProductOwnerPassChange = (e) => {
		this.setState({ ProductOwnerpassword: e.target.value });
	};
	handleProductOwnerStatusChange = (e) => {
		this.setState({ ProductOwnerstatus: e.target.value });
	};
	handleTypeChange = (e) => {
		this.setState({ type: e.target.value });
	};
	handleChange1 = (event) => {
		this.setState({ USD: event.target.value });
	};
	handleChange2 = (event) => {
		this.setState({ Country: event.target.value });
	};
	handleChange3 = (event) => {
		this.setState({ Consultant: event.target.value });
	};
	handleChange4 = (event) => {
		this.setState({ ProductOwner: event.target.value });
	};
	handleRateChange = (e) => {
		this.setState({ rate: e.target.value });
	};

	handleRateUnitChange = (e) => {
		this.setState({ rate_unit: e.target.value });
	};

	handleCurrencyChange = (e) => {
		this.setState({ currency: e.target.value });
	};
	handlestatusChange = (e) => {
		this.setState({ status: e.target.value });
	};

	// addProductOwnerOrConsultant = (userObj) => {
	// 	// e.preventDefault();
	// 	const {
	// 		name,
	// 		email,
	// 		password,
	// 		type,
	// 		status
	// 	} = userObj;
	// 	firebase
	// 		.auth()
	// 		.createUserWithEmailAndPassword(email, password)
	// 		.then(() => {
	// 			var userId = firebase.auth().currentUser.uid;
	// 			var user = firebase.auth().currentUser;
	// 			console.log('user', user);
	// 			const ref = firebase.database().ref(`Users/`).push()
	// 			ref
	// 				.set({
	// 					uid: userId,
	// 					name: name,
	// 					email: email,
	// 					type: type,
	// 					status: status
	// 				}).then((res) => {
	// 					debugger
	// 				})
	// 				.catch((error) => {
	// 					debugger
	// 					console.log('Error during user creating on firebase', error);
	// 				});
	// 			alert('Add Registered Successfully');
	// 			this.setState({
	// 				name: '',
	// 				email: '',
	// 				password: '',
	// 				type: '',
	// 				state: ''
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			alert(error);
	// 		});
	// };

	updateCustomer = (e) => {
		e.preventDefault();
		const {
			customercode,
			rate,
			rate_unit,
			email,
			customer,
			phone,
			contact,
			address,
			city,
			zip_code,
			// USD,
			Country,
			type,
			status
		} = this.state;
		const { _param } = this.props.location.state;

		firebase
			.database()
			.ref('Customer/' + _param.key)
			.update({
				customercode: customercode,
				email: email,
				customer: customer,
				phone: phone,
				contact: contact,
				address: address,
				city: city,
				zip_code: zip_code,
				rate: rate,
				rate_unit: rate_unit,
				// USD: USD,
				Country: Country,
				type: type,
				status: status
				// Consultant: Consultant,
				// ProductOwner: ProductOwner,
				// role: 'Customer'
			})
			.then(() => {
				alert('user updated successfully');
			})
			.catch((error) => {
				alert(error);
			});
	};

	addCustomer = (e) => {
		e.preventDefault();
		if(this.state.users.length == 0){
			alert("please add consultant and product owners")
			return false
		}
		const {
			email,
			customer,
			phone,
			contact,
			address,
			city,
			zip_code,
			Country,
			currency,
			rate,
			rate_unit,
			customercode,
			type,
			status,
			users
		} = this.state;
		const customer_data = {
			customercode,
			email,
			customer,
			phone,
			contact,
			address,
			city,
			zip_code,
			currency,
			rate,
			rate_unit,
			Country,
			users,
			type: type,
			status: status
		};
		console.log('user', customer_data);

		const ref = firebase.database().ref().child('Customer');
		ref.push(customer_data).catch((error) => {
			console.log('Error during user add on firebase', error);
		});
		alert('Customer Registered Successfully');
		this.setState({
			customercode: '',
			rate: '',
			rate_unit: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			customer: '',
			phone: '',
			contact: '',
			address: '',
			city: '',
			zip_code: '',
			USD: '',
			Country: '',
			Consultant: '',
			type: '',
			status: '',
			users: []
		});
	};
	// deleteCustomer = (key, index) => {
	// 	console.log("key", key, index);
	// 	let fetchpost = this.state.allcustomers;
	// 	firebase
	// 		.database()
	// 		.ref("Users")
	// 		.child(key)
	// 		.remove()
	// 		.then(() => {
	// 			fetchpost.splice(index, 1);
	// 			this.setState({
	// 				allcustomers: fetchpost
	// 			});
	// 		});
	// };

	onAdduser = (users) => {
		debugger;
		this.setState({
			users: users
		});
	};

	render() {
		const { classes } = this.props;
		const { _param } = this.props.location.state;
		const {
			customer,
			phone,
			contact,
			address,
			city,
			zip_code,
			email,
			ProductOwnerfirstName,
			ProductOwnerlastName,
			ProductOwneremail,
			ProductOwnerpassword,
			currency,
			rate,
			rate_unit,
			customercode,
			allcustomers
		} = this.state;
		const tableHead = [ '#', 'Name', 'Email', 'Password', 'Type', 'Status', 'Actions' ];
		console.log('asd', this.state.users);
		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="rose" icon>
							<CardIcon color="rose">
								<h4>Add a Customer</h4>
							</CardIcon>
						</CardHeader>
						<CardBody>
							<form>
								<CustomInput
									id="required"
									labelText="Customer Code"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handleCustomerCodeChange}
									value={customercode}
									inputProps={{
										type: 'text'
									}}
								/>
								<CustomInput
									id="required"
									labelText="Customer"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handleCustomerChange}
									value={customer}
									inputProps={{
										type: 'text'
									}}
								/>
								<CustomInput
									//   id="disabled"
									labelText="Rate"
									formControlProps={{
										fullWidth: true
									}}
									inputProps={{
										type: 'number'
										// placeholder: "Disabled",
										// disabled: true
									}}
									onChange={this.handleRateChange}
									value={rate}
								/>
								<GridContainer>
									<GridItem xs={6} sm={6} lg={6}>
										<FormControl
											style={{ marginTop: 10 }}
											className={[ classes.formControl, 'form-control' ]}
											variant="outlined"
										>
											<InputLabel
												style={{ fontSize: 10 }}
												ref={(ref) => {
													this.InputLabelRef = ref;
												}}
												htmlFor="outlined-age-simple"
											>
												Rate Unit
											</InputLabel>
											<Select
												value={this.state.rate_unit}
												onChange={this.handleRateUnitChange}
												// displayEmpty
												inputProps={{
													name: 'age',
													id: 'age-simple'
												}}
											>
												<MenuItem value={'Hourly'}>Hourly</MenuItem>
												<MenuItem value={'Daily'}>Daily</MenuItem>
												<MenuItem value={'Weekly'}>Weekly</MenuItem>
												<MenuItem value={'Monthly'}>Monthly</MenuItem>
											</Select>
										</FormControl>
										{/* <CustomInput
											//   id="disabled"
											labelText="Rate Unit"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: 'text'
												// placeholder: "Disabled",
												// disabled: true
											}}
											onChange={this.handleRateUnitChange}
											value={rate_unit}
										/> */}
									</GridItem>
									<GridItem xs={6} sm={6} lg={6}>
										<FormControl
											style={{ marginTop: 10 }}
											className={[ classes.formControl, 'form-control' ]}
											variant="outlined"
										>
											<InputLabel
												style={{ fontSize: 10 }}
												ref={(ref) => {
													this.InputLabelRef = ref;
												}}
												htmlFor="outlined-age-simple"
											>
												Currency
											</InputLabel>
											<Select
												value={this.state.currency}
												onChange={this.handleCurrencyChange}
												// displayEmpty
												inputProps={{
													name: 'age',
													id: 'age-simple'
												}}
											>
												<MenuItem value={'USD'}>USD</MenuItem>
												<MenuItem value={'EURO'}>EURO</MenuItem>
												<MenuItem value={'AED'}>AED</MenuItem>
											</Select>
										</FormControl>
										{/* <CustomInput
											//   id="disabled"
											labelText="Currency"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: 'text'
												// placeholder: "Disabled",
												// disabled: true
											}}
											onChange={this.handleCurrencyChange}
											value={currency}
										/> */}
									</GridItem>
								</GridContainer>

								{_param === '' ? (
									<CustomInput
										labelText="Email Address *"
										id="registeremail"
										formControlProps={{
											fullWidth: true
										}}
										onChange={this.handleEmailChange}
										value={email}
										inputProps={{
											type: 'email'
										}}
									/>
								) : (
									<CustomInput
										labelText="Email Address *"
										id="registeremail"
										formControlProps={{
											fullWidth: true
										}}
										disabled={true}
										onChange={this.handleEmailChange}
										value={email}
										inputProps={{
											type: 'email'
										}}
									/>
								)}
								<CustomInput
									labelText="Phone *"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handlePhoneChange}
									value={phone}
									inputProps={{
										type: 'number'
									}}
								/>
								<CustomInput
									labelText="Contact *"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handleContactChange}
									value={contact}
									inputProps={{
										type: 'number'
									}}
								/>
								<CustomInput
									labelText="Address Line *"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handleAddressChange}
									value={address}
									inputProps={{
										type: 'text'
									}}
								/>
								<CustomInput
									labelText="City *"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handleCityChange}
									value={city}
									inputProps={{
										type: 'text'
									}}
								/>
								<CustomInput
									labelText="Postal / Zip *"
									formControlProps={{
										fullWidth: true
									}}
									onChange={this.handleZipChange}
									value={zip_code}
									inputProps={{
										type: 'number'
									}}
								/>
								<Grid className="dropdowngrid" spacing={8}>
									<GridItem xs={6} sm={6} md={4}>
										<FormControl
											className={[ classes.formControl, 'form-control' ]}
											variant="outlined"
										>
											<InputLabel
												style={{ fontSize: 10 }}
												ref={(ref) => {
													this.InputLabelRef = ref;
												}}
												htmlFor="outlined-age-simple"
											>
												Country
											</InputLabel>
											<Select
												value={this.state.Country}
												onChange={this.handleChange2}
												// displayEmpty
												input={
													<OutlinedInput
														// style={{ fontSize: 10 }}
														labelWidth={40}
														name="Country"
														id="outlined-age-simple"
													/>
												}
											>
												<MenuItem value={'USA'}>USA</MenuItem>
												<MenuItem value={'UK'}>UK</MenuItem>
												<MenuItem value={'UAE'}>UAE</MenuItem>
											</Select>
										</FormControl>
									</GridItem>
								</Grid>
								
									<Button
										color="rose"
										onClick={this.addCustomer}
										className={classes.registerButton}
									>
										Add
									</Button>
							</form>
						</CardBody>
					</Card>
				</GridItem>
				<Card>
					<CardHeader color="rose" icon>
						<CardIcon color="rose">
							<h4>Product Owner OR Consultant</h4>
						</CardIcon>
						<CardBody>
							<GridItem xs={12}>
								<ExtendedTablesAddCustomer
									tableHead={tableHead}
									onAdd={this.onAdduser.bind(this)}
									// tableData={allcustomers}
									// deleteUser={this.deleteCustomer}
									// addUser={this.addProductOwnerOrConsultant}
								/>
							</GridItem>
						</CardBody>
					</CardHeader>
				</Card>
			</GridContainer>
		);
	}
}

export default withStyles(styles)(AddCustomerForm);
