import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import styled from "styled-components";

const Wrapper = styled.div`
	@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");

	width: 260px;
	/* border: 1px solid black; */
	margin: 0 auto;
	font-family: "Roboto", sans-serif;
	h3 {
		font-weight: bold;
	}
`;
const Timer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;

	.left {
		width: 200px;
	}
	.right {
		button {
			border: 1px solid grey;
			border-radius: 5px;
			padding-top: 5px;
			padding-bottom: 5px;
			cursor: pointer;
		}
	}
`;
const Exp = styled.div`
	padding-bottom: 40px;
`;
const Times = styled.div`
	li {
		padding-bottom: 10px;
	}
`;

class Record extends Component {
	state = {
		month: "",
		date: "",
		year: "",
		hour: "",
		minute: "",
		second: "",
		txt: "",
	};
	componentDidMount() {
		this.changeTime();
	}
	changeTime = () => {
		let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
		let [hour, minute, second] = new Date()
			.toLocaleTimeString("en-US")
			.split(/:| /);
		let txt =
			month +
			"/" +
			date +
			"/" +
			year +
			" " +
			hour +
			":" +
			minute +
			":" +
			second;
		this.setState({
			month: month,
			date: date,
			year: year,
			hour: hour,
			minute: minute,
			second: second,
			txt: txt,
		});
		setTimeout(() => {
			this.changeTime();
		}, 1000);
	};
	render() {
		return (
			<Wrapper>
				<h3>Press a button to record a time</h3>
				<Exp>
					This react app shows you a time and it will save the time after you
					press a button. <br />
					<br />
					It uses Redux and React-Redux for state management and dispatch to
					store the time in an array.
				</Exp>
				<Timer>
					<div className="left">
						{this.state.month}/{this.state.date}/{this.state.year}{" "}
						{this.state.hour}:{this.state.minute}:{this.state.second}
					</div>
					<div className="right">
						<button onClick={() => this.props.onAddRecord(this.state.txt)}>
							Record
						</button>
					</div>
				</Timer>
				<Times>
					<ul>
						{this.props.storedResults.map((res, index) => {
							return <li key={index}>{res}</li>;
						})}
					</ul>
				</Times>
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return { storedResults: state.rec.results };
};
const mapDispatchToProps = (dispatch) => {
	return {
		onAddRecord: (val) => dispatch(actionCreators.addRecord(val)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Record);
