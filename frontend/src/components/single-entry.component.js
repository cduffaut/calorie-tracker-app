import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, Row, Col} from 'react-bootstrap';

const Entry = ({ entryData, setChangeWeight, deleteEntry, setChangeCalories }) => {
	return (
		<Card>
			<Row>
				<Col>Meal: {entryData !== undefined && entryData.product_name}</Col>
				<Col>Weight: {entryData !== undefined && entryData.weight}</Col>
				<Col>Calories: {entryData !== undefined && entryData.calories}</Col>
				<Col><button onClick={() => deleteEntry(entryData._id)}>Delete Meal</button></Col>
				<Col><button onClick={() => ChangeWeight()}>Change Weight</button></Col>
				<Col><button onClick={() => ChangeCalories()}>Change Calories</button></Col>
			</Row>
		</Card>
	);

	function ChangeWeight() {
		setChangeWeight(
			{
				"change": true,
				"id": entryData._id 
			}
		)
	}

	function ChangeCalories() {
		setChangeCalories(
			{
				"change": true,
				"id": entryData._id
			}
		)
	}
};