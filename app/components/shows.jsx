'use strict';

var moment = require('moment-timezone');
var React = require('react');

var PaginationMixin = require('./pagination_mixin');

var ShowDetail = React.createClass({
	getDefaultProps: function () {
		return {};
	},

	render: function () {
		return <div className='show-detail' dangerouslySetInnerHTML={{__html: this.props.content}}/>;
	}
});

var ShowInfo = React.createClass({
	getDefaultProps: function () {
		return {};
	},

	getInitialState: function () {
		return {detail: false};
	},

	display: function () {
		var detail = !this.state.detail;
		this.setState({detail: detail});
		if (typeof window._gaq !== 'undefined') {
			window._gaq.push(['_trackEvent', 'Shows', (detail ? 'View Detail' : 'Hide Detail'), this.props.url]);
		}
		return false;
	},

	render: function () {
		var hasContent = !!String(this.props.content).trim();
		if (hasContent) {
			return <div>
				<a href={this.props.url} onClick={this.display}>
					<span>{this.props.title || this.props.venue} <span className='show-date'>{this.props.moment.format('dddd, MMMM D, YYYY')}{this.props.time && (' | ' + this.props.time)}</span></span>
				</a>
				{this.state.detail && ShowDetail(this.props)}
			</div>;
		}
		return <span>{this.props.title || this.props.venue} <span className='show-date'>{this.props.moment.format('dddd, MMMM D, YYYY')}{this.props.time && (' | ' + this.props.time)}</span></span>;
	}
});

var Show = React.createClass({
	render: function () {
		return <li><article>{ShowInfo(this.props)}</article></li>;
		}
});

var datePattern = /^[^|]+/;

var Shows = React.createClass({

	mixins: [PaginationMixin],

	getDefaultProps: function () {
		return {
			tz: 'America/New_York',
			shows: [],
			pageSize: 5
		};
	},

	render: function () {
		var now = moment().tz(this.props.tz);
		var shows = this.props.shows.slice(0);
		shows.forEach(function (show) {
			var date = datePattern.exec(show.when)[0].trim();
			var when = moment(date, 'MMM DD, YYYY', 'en').tz(this.props.tz);
			when.locale(false); // back to browser default for output
			var daysAway = now.diff(when, 'days');
			show.moment = when;
			show.daysAway = daysAway;
			show.past = daysAway > 0;
		}, this);
		// sort future shows ascending, past shows descending...
		shows.sort(function (b, a) {
			if (!a.past && !b.past) { // both are upcoming
				var tmp = a;
				a = b;
				b = tmp;
			}
			var diff = a.moment.diff(b.moment);
			if (diff < 0) {
				return -1;
			}
			if (diff > 0) {
				return 1;
			}
			if (a.when < b.when) {
				return -1;
			}
			if (a.when > b.when) {
				return 1;
			}
			if (a.url < b.url) {
				return -1;
			}
			if (a.url > b.url) {
				return 1;
			}
			return 0;
		});
		var seenPast = false;
		var elems = shows.map(function (show, idx) {
				if (idx === 0 && !show.past) {
					return <span key='upcoming'>
						<li>Upcoming shows...</li>
						{Show(show)}
					</span>;
				}
				if (show.past && !seenPast) {
					seenPast = true;
					if (idx !== 0) {
						return <span key='past'>
								<li>Past shows...</li>
								{Show(show)}
							</span>;
					}
				}
				show.key = show.url;
				return Show(show);
			}, this);
		return <span>
			{this.paginate(elems)}
			{this.getPagination(elems)}
		</span>;
	}

});

module.exports = Shows;
