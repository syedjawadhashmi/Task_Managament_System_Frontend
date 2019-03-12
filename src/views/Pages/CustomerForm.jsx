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

class CustomerForm extends React.Component {
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
			ConsultantfirstName: '',
			ConsultantlastName: '',
			Consultantemail: '',
			Consultantpassword: '',
			Consultantstatus: '',
			type: '',
			rate: '',
      rate_unit: '',
      customercode:'',
			edit: false
		};
	}

	componentDidMount() {
		const { _param } = this.props.location.state;
		console.log('parms', _param);
		if (_param !== '') {
			this.setState({
				customer: _param.all_customers.customer,
				email: _param.all_customers.email,
				phone: _param.all_customers.phone,
				contact: _param.all_customers.contact,
				address: _param.all_customers.address,
				city: _param.all_customers.city,
				zip_code: _param.all_customers.zip_code,
				USD: _param.all_customers.USD,
				Country: _param.all_customers.Country,
				Consultant: _param.all_customers.Consultant,
				ProductOwner: _param.all_customers.ProductOwner
			});
		}
		this.setState({
			labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
		});
	}
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

	addProductOwnerOrConsultant = (e) => {
		e.preventDefault();
		const {
			ProductOwnerfirstName,
			ProductOwnerlastName,
			ProductOwneremail,
			ProductOwnerpassword,
			ProductOwnerstatus,
			type
		} = this.state;
		firebase
			.auth()
			.createUserWithEmailAndPassword(ProductOwneremail, ProductOwnerpassword)
			.then(() => {
				var userId = firebase.auth().currentUser.uid;
				var user = firebase.auth().currentUser;
				console.log('user', user);
				const ref = firebase.database().ref('ProductOwners/' + userId);
				ref
					.set({
						uid: userId,
						firstname: ProductOwnerfirstName,
						name: ProductOwnerlastName,
						email: ProductOwneremail,
						type: type,
						status: ProductOwnerstatus
					})
					.catch((error) => {
						console.log('Error during user creating on firebase', error);
					});
				alert('Add Registered Successfully');
			})
			.catch((error) => {
				alert(error);
			});
		this.setState({
			ProductOwnerfirstName: '',
			ProductOwnerlastName: '',
			ProductOwneremail: '',
			ProductOwnerpassword: '',
			ProductOwnerstatus: '',
			type: ''
		});
	};
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
			Consultant,
			ProductOwner
		} = this.state;
		const { _param } = this.props.location.state;

		firebase
			.database()
			.ref('Customer/' + _param.key)
			.update({
        customercode:customercode,
				email: email,
				customer: customer,
				phone: phone,
				contact: contact,
				address: address,
				city: city,
        zip_code: zip_code,
        rate:rate,
        rate_unit:rate_unit,
				// USD: USD,
				Country: Country,
				// Consultant: Consultant,
				// ProductOwner: ProductOwner,
				role: 'Customer'
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
      customercode
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
			role: 'Customer'
		};
		console.log('user', customer_data);

		const ref = firebase.database().ref().child('Customer');
		ref.push(customer_data).catch((error) => {
			console.log('Error during user add on firebase', error);
		});
		alert('Customer Registered Successfully');
		this.setState({
      customercode:'',
      rate:'',
      rate_unit:'',
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
			ProductOwner: ''
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
      customercode
		} = this.state;

		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="rose" icon>
							<CardIcon color="rose">
								<h4>Edit a Customer</h4>
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
										type: 'text'
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
                      className={[classes.formControl, "form-control"]}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
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
                          name: "age",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value={"Hourly"}>Hourly</MenuItem>
                        <MenuItem value={"Daily"}>Daily</MenuItem>
                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
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
                      className={[classes.formControl, "form-control"]}
                      variant="outlined"
                    >
                      <InputLabel
                        style={{ fontSize: 10 }}
                        ref={ref => {
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
                          name: "age",
                          id: "age-simple"
                        }}
                      >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"EURO"}>EURO</MenuItem>
                        <MenuItem value={"AED"}>AED</MenuItem>
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
								{this.props.edit ? (
									<Button
										color="rose"
										onClick={() => console.log('edit customer')}
										className={classes.registerButton}
									>
										Edit
									</Button>
								) : (
									<Button
										color="rose"
										onClick={_param === '' ? this.addCustomer : this.updateCustomer}
										className={classes.registerButton}
									>
										{_param === '' ? 'Add' : 'Update'}
									</Button>
								)}
							</form>
						</CardBody>
					</Card>
				</GridItem>
				<Card>
					<CardHeader color="rose" icon>
						<CardIcon color="rose">
							<h4>Add a Product Owner OR Consultant</h4>
						</CardIcon>
						<CardBody>
							<CustomInput
								labelText="First Name *"
								formControlProps={{
									fullWidth: true
								}}
								onChange={this.handleProductOwnerFirstNameChange}
								value={ProductOwnerfirstName}
								inputProps={{
									type: 'text'
								}}
							/>
							<CustomInput
								labelText="Name *"
								onChange={this.handleProductOwnerLastNameChange}
								value={ProductOwnerlastName}
								formControlProps={{
									fullWidth: true
								}}
								inputProps={{
									type: 'text'
								}}
							/>
							<CustomInput
								labelText="Email Address *"
								id="registeremail"
								formControlProps={{
									fullWidth: true
								}}
								onChange={this.handleProductOwnerEmailChange}
								value={ProductOwneremail}
								inputProps={{
									type: 'email'
								}}
							/>
							<CustomInput
								labelText="Passwrod *"
								id="registeremail"
								formControlProps={{
									fullWidth: true
								}}
								onChange={this.handleProductOwnerPassChange}
								value={ProductOwnerpassword}
								inputProps={{
									type: 'password'
								}}
							/>
							<FormControl style={{ marginBottom: 10 }} className={[ 'form-control' ]} variant="outlined">
								<InputLabel
									style={{ fontSize: 10 }}
									ref={(ref) => {
										this.InputLabelRef = ref;
									}}
									htmlFor="outlined-age-simple"
								>
									Type
								</InputLabel>
								<Select
									value={this.state.type}
									onChange={this.handleTypeChange}
									// displayEmpty
									inputProps={{
										name: 'age',
										id: 'age-simple'
									}}
								>
									<MenuItem value={'Consultant'}>Consultant</MenuItem>
									<MenuItem value={'Product Owner'}>Product Owner</MenuItem>
								</Select>
							</FormControl>
							<FormControl style={{ marginBottom: 10 }} className={[ 'form-control' ]} variant="outlined">
								<InputLabel
									style={{ fontSize: 10 }}
									ref={(ref) => {
										this.InputLabelRef = ref;
									}}
									htmlFor="outlined-age-simple"
								>
									Status
								</InputLabel>
								<Select
									value={this.state.ProductOwnerstatus}
									onChange={this.handleProductOwnerStatusChange}
									// displayEmpty
									inputProps={{
										name: 'age',
										id: 'age-simple'
									}}
								>
									<MenuItem value={'Active'}>Active</MenuItem>
									<MenuItem value={'Suspended'}>Suspended</MenuItem>
								</Select>
							</FormControl>
							<Button
								color="rose"
								onClick={this.addProductOwnerOrConsultant}
								className={classes.registerButton}
							>
								Add
							</Button>
						</CardBody>
					</CardHeader>
				</Card>
			</GridContainer>
		);
	}
}

export default withStyles(styles)(CustomerForm);
