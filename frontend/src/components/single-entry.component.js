import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, Row, Col} from 'react-bootstrap';

const Entry = ({ entryData, deleteSingleEntry, setChangeProduct, setChangeEntry }) => {
	return (
		<Card>
			<Row>
				<Col>Meal: {entryData !== undefined && entryData.product_name}</Col>
				<Col>Weight: {entryData !== undefined && entryData.weight_grams}</Col>
				<Col>Calories: {entryData !== undefined && entryData.calories}</Col>
				<Col><Button onClick={() => deleteSingleEntry(entryData._id)}>Delete Meal</Button></Col>
				<Col><Button onClick={() => setChangeProduct({"change": true, "id": entryData._id})}>Change Product</Button></Col>
				<Col><Button onClick={() => setChangeEntry({"change": true, "id": entryData._id})}>Change Entry</Button></Col>
			</Row>
		</Card>
	);
};

export default Entry;