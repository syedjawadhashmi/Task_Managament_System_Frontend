import React from 'react';
import './customerForm.css';
import {
    Grid,
    Row,
    Col,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";

export default class CustomerPage extends React.Component {
    render(){
        return(
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                        <Card
                            title="Edit a customer"
                            content={
                                // <Grid>
                                    <Row>
                                        <Col md={6}>
                                            <h4> Contact</h4>
                                                <form>
                                                    <Row className="form-group row">
                                                        <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Customer</label>
                                                        <Col md={6}>
                                                            <input type="name" className="form-control form-control-sm" id="colFormLabelSm"/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="form-group row">
                                                        <label for="colFormLabel" className="col-sm-2 col-form-label">Email</label>
                                                            <Col md={6}>
                                                                <input type="email" className="form-control" id="colFormLabel"/>
                                                            </Col>
                                                    </Row>
                                                    <Row className="form-group row">
                                                        <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Phone</label>
                                                            <Col md={6}>
                                                                <input type="number" className="form-control form-control-lg" id="colFormLabelLg"/>
                                                            </Col>
                                                    </Row>
                                                    <Row className="form-group row">
                                                        <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Contact</label>
                                                            <Col md={6}>
                                                                <input type="number" className="form-control form-control-lg" id="colFormLabelLg"/>
                                                            </Col>
                                                    </Row>
                                                    <Row className="form-group row">
                                                        <div className="col-sm-2"></div>
                                                            <Col md={6}>
                                                                <input type="name" className="form-control form-control-lg" id="colFormLabelLg"/>
                                                            </Col>
                                                    </Row>
                                                </form>
                                        </Col>
                                        <Col md={6}>
                                            <h4> Billing</h4>
                                            <form>
                                                <Row className="form-group row">
                                                    <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Currency</label>
                                                        <Col md={6}>
                                                            <select class="form-control" id="sel1">
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select>
                                                        </Col>
                                                </Row>
                                                <Row className="form-group row">
                                                    <label for="colFormLabel" className="col-sm-2 col-form-label">Address line 1</label>
                                                        <Col md={6}>
                                                            <input type="text" className="form-control" id="colFormLabel"/>
                                                        </Col>
                                                </Row>
                                                <Row className="form-group row">
                                                    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">City</label>
                                                        <Col md={6}>
                                                            <input type="text" className="form-control form-control-lg" id="colFormLabelLg"/>
                                                        </Col>
                                                </Row>
                                                <Row className="form-group row">
                                                    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Postal/Zip Code</label>
                                                        <Col md={6}>
                                                            <input type="number" className="form-control form-control-lg" id="colFormLabelLg"/>
                                                        </Col>
                                                </Row>
                                                <Row className="form-group row">
                                                    <label for="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Country</label>
                                                        <Col md={6}>
                                                            <input type="name" className="form-control form-control-lg" id="colFormLabelLg"/>
                                                        </Col>
                                                </Row>
                                            </form>
                                        </Col>
                                    </Row>
                                // </Grid>
                            }
                        />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}