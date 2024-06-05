import React, { useState, useEffect } from 'react';

export default function ReadClarity() {
	const [showReadCW, setShowReadCW] = useState(false)
	const [context, setContext] = useState('SHOW ALL')
	const [data, setData] = useState(null);
	const handleClick = () => {
		Read()
		setShowReadCW(!showReadCW)
		setContext(prevContext => prevContext === 'SHOW ALL' ? 'Click again to close SHOW ALL' : 'SHOW ALL')
	}
	function Read() {
		const url = 'https://localhost:7122/api/Clarity/GetList';
		fetch(url, {
			method: 'GET',
			headers: {
				'Accept': '*/*'
			},
		})
			.then(response => response.json())
			.then(responseData => {
				setData(responseData); // Access the array using the key
			})
			.catch((error) => console.error('Error:', error));
	}

	return (
		<>
			<button onClick={handleClick} className='CRUDButton btn btn-primary btn-lg'>{context}</button>
			{showReadCW &&
				<div className='formCRUDContainer'>
					<h3>SHOW ALL</h3>
					<div>
						<div className='refreshButtonConainer'>
							<button onClick={() => Read()} className='btn btn-primary btn-lg refreshButton'>REFRESH</button>
						</div>
						<table className='table table-striped table-bordered'>
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Color</th>
									<th>Price</th>
								</tr>
							</thead>

							<tbody>
								{data && (
									data.map((data) => (
										<tr key={data.id}>
											<td>{data.id}</td>
											<td>{data.name}</td>
											<td>{data.color}</td>
											<td>{data.price}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
					<button onClick={handleClick} className='btn btn-danger btn-lg submitButton'>CLOSE</button>
				</div>
			}
		</>
	)
}
