import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import styled from "styled-components";

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
		}
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
	componentWillMount() {
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
			<div>
				<h3>Record</h3>
				<Timer>
					<div className="left">
						{this.state.month}/{this.state.date}/{this.state.year}{" "}
						{this.state.hour}:{this.state.minute}:{this.state.second}
					</div>
					<div className="right">
						<button onclick={() => this.props.onAddRecord(this.state.txt)}>
							Record
						</button>
					</div>
				</Timer>
			</div>
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
