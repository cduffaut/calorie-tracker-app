import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, Container, Modal } from 'react-bootstrap';
import Entry from './single-entry.component';

const Entries = () => {
	const [entries, setEntries] = useState([])
	const [refreshData, setRefreshData] = useState(false)
	const [changeEntry, setChangeEntry] = useState({"change": false, "id": 0})
	const [changeProduct, setChangeProduct] = useState({"change": false, "id": 0})
	const [newProductName, setProductName] = useState("")
	const [addNewProduct, setAddNewProduct] = useState(false)
	const [newEntry, setNewEntry] = useState({"product_name": "", "calories": 0, "weight": 0})

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
					<Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry} />
				))}
			 </Container>
		</div>
	);
};

function addSingleEntry() {
	setAddNewEntry(false)
	var url = "http://localhost:8000/entry/create"

	axios.post(url, {
		"product_name": newEntry.product_name,
		"calories:": newEntry.calories,
		"weight": newEntry.weight
	}).then(response => {
		if (response.status === 200) {
			setRefreshData(true)
		}
	})
}

function deleteSingleEntry(id) {
	var url = "http://localhost:8000/entry/delete" + id
	axios.delete(url, {

	}).then(response => {
		if (response.status === 200) {
			setRefreshData(true) 
		}
	})
}

function getAllEntries() {
	var url = "http://localhost:8000/entries"
	axios.get(url, {
		responseType: 'json'
	}).then(response => {
		if (response.status === 200){
			setEntries(response.data)
		}
	})
}