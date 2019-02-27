import React from 'react';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ExtendedTables from "../Tables/ExtendedTables";
export default class CustomerList extends React.Component {
    render(){
        return(
            <div>
                <GridContainer>
                    <Card>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={9} sm={9} md={9}>
                                    <h4>Customer</h4>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>

                                </GridItem>
                                <ExtendedTables/>
                            </GridContainer>                        
                        </CardBody>
                    </Card>
                </GridContainer>
            </div>
        );
    }
}