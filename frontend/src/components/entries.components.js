import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, Container, Modal, FormControl } from 'react-bootstrap';
import Entry from './single-entry.component';

const Entries = () => {
	const [entries, setEntries] = useState([])
	const [refreshData, setRefreshData] = useState(false)
	const [changeEntry, setChangeEntry] = useState({"change": false, "id": 0})
	const [changeProduct, setChangeProduct] = useState({"change": false, "id": 0})
	const [newProductName, setProductName] = useState("")
	const [addNewEntry, setAddNewEntry] = useState(false)
	const [newEntry, setNewEntry] = useState({"product_name": "", "calories": 0, "weight_grams": 0})

	useEffect(() => {
		getAllEntries();
	}, [])

	if (refreshData) {
		setRefreshData(false);
		getAllEntries(); 
	}

	return (
		<div>
			<Container>
				<Button onClick={() => setAddNewEntry(true)}>Track Today's calories</Button>
			</Container>
			<Container>
				{entries != null && entries.map((entry, i) => (
					<Entry key={i} entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeProduct={setChangeProduct} setChangeEntry={setChangeEntry} />
				))}
			</Container>

			<Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centered>
				<Modal.Header>
					<Modal.Title>Add calorie Entry</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Product</Form.Label>
						<Form.Control onChange={(event) => {newEntry.product_name = event.target.value}}></Form.Control>
						<Form.Label>Calories</Form.Label>
						<Form.Control type="number" onChange={(event) => {newEntry.calories = parseFloat(event.target.value)}}></Form.Control>
						<Form.Label>Weight</Form.Label>
						<Form.Control type="number" onChange={(event) => {newEntry.weight_grams = parseFloat(event.target.value)}}></Form.Control>
					</Form.Group>
					<Button onClick={() => addSingleEntry()}>Add</Button>
					<Button onClick={() => setAddNewEntry(false)}>Cancel</Button>
				</Modal.Body>
			</Modal>

			<Modal show={changeProduct.change} onHide={() => setChangeProduct({"change": false, "id": 0})} centered>
				<Modal.Header closeButton>
					<Modal.Title>Change Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>New Product</Form.Label>
						<FormControl onChange={(event) => {setProductName(event.target.value)}}></FormControl>
						<Button onClick={() => changeProductForEntry()}>Change</Button>
						<Button onClick={() => setChangeProduct({"change": false, "id": 0})}>Cancel</Button>
					</Form.Group>
				</Modal.Body>
			</Modal>
		
			<Modal show={changeEntry.change} onHide={() => setChangeEntry({"change":false, "id": 0})} centered>
				<Modal.Header closeButton> 
					<Modal.Title>Change Entry</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Product</Form.Label>
						<Form.Control onChange={(event) => {newEntry.product_name = event.target.value}}></Form.Control>
						<Form.Label>Calories</Form.Label>
						<Form.Control type="number" onChange={(event) => {newEntry.calories = parseFloat(event.target.value)}}></Form.Control>
						<Form.Label>Weight</Form.Label>
						<Form.Control type="number" onChange={(event) => {newEntry.weight_grams = parseFloat(event.target.value)}}></Form.Control>
					</Form.Group>
					<Button onClick={() => changeSingleEntry()}>Change</Button>
					<Button onClick={() => setChangeEntry({"change": false, "id": 0})}>Cancel</Button>
				</Modal.Body>
			</Modal>
		</div>
	);

	function changeProductForEntry() {
		changeProduct.change = false

		var url = "http://localhost:8000/entry/update/" + changeProduct.id
		axios.put(url, {
			"product_name": newProductName
		}).then(response => {
			console.log(response.status)
			if (response.status === 200) {
				setRefreshData(true)
			}
		})
	}

	function changeSingleEntry() {
		changeEntry.change = false;

		var url = "http://localhost:8000/entry/update/" + changeEntry.id;
		axios.put(url, newEntry)
		.then(response => {
			if (response.status === 200) {
				setRefreshData(true)
			}
		})
	}

	function addSingleEntry() {
		setAddNewEntry(false)
		var url = "http://localhost:8000/entry/create"

		axios.post(url, {
			"product_name": newEntry.product_name,
			"calories": newEntry.calories,
			"weight_grams": newEntry.weight_grams
		}).then(response => {
			if (response.status === 200) {
				setRefreshData(true)
			}
		})
	}

	function deleteSingleEntry(id) {
		var url = "http://localhost:8000/entry/delete/" + id
		axios.delete(url).then(response => {
			if (response.status === 200) {
				setRefreshData(true) 
			}
		})
	}

	function getAllEntries() {
		var url = "http://localhost:8000/entries/"
		axios.get(url, {
			responseType: 'json'
		}).then(response => {
			if (response.status === 200){
				setEntries(response.data)
			}
		})
	}
};

export default Entries;