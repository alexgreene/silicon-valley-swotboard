//main.js

/* ----------------------------------------------- */
/* -----------------Data Handling----------------- */
/* ----------------------------------------------- */

// singleton
var SWOTBoard = (function() {

	var instance;

	function init() {

		var cards_s = [];
		var cards_w = [];
		var cards_o = [];
		var cards_t = [];

		return {
			numCards: cards_s.length + cards_w.length + cards_o.length + cards_t.length,
			addCard: function() {

				var dropdown = document.getElementById('swotType');
				var field = document.getElementById('msg');
				var msg = field.value;
				if (msg == '') return;
				field.value = '';

				var c =  new Card(dropdown.value, msg);
				switch(c.type){
					case 's':
						cards_s.push(c);
						break;
					case 'w':
						cards_w.push(c);
						break;
					case 'o':
						cards_o.push(c);
						break;
					case 't':
						cards_t.push(c);
						break;
					default:
						console.log("cannot add: invalid card type");
				}

				this.updateDisplay();
			},
			removeCard: function(c) {
				var arr;
				switch(c.type){
					case 's':
						arr = cards_s;
						break;
					case 'w':
						arr = cards_w;
						break;
					case 'o':
						arr = cards_o;
						break;
					case 't':
						arr = cards_t;
						break;
					default:
						console.log("cannot remove: invalid card type");
						return;
				};
				for (var p = 0; p < arr.length; p++) {
					if ( arr[p] === c ) {
						break;
					}
				}
				arr.splice(p, 1);
				this.updateDisplay();
			},
			getStrengthCards: function() {
				return cards_s;
			},
			getWeaknessCards: function() {
				return cards_w;
			},
			getOpportunityCards: function() {
				return cards_o;
			},
			getThreatCards: function() {
				return cards_t;
			},
			updateDisplay: function(){
				var s_list = document.getElementsByClassName('s_list')[0];
				var w_list = document.getElementsByClassName('w_list')[0];
				var o_list = document.getElementsByClassName('o_list')[0];
				var t_list = document.getElementsByClassName('t_list')[0];

				s_list.innerHTML = '';
				w_list.innerHTML = '';
				o_list.innerHTML = '';
				t_list.innerHTML = '';

				var s_data = board.getStrengthCards();
				for(var s = 0; s < s_data.length; s++){
					s_list.insertAdjacentHTML('afterBegin', '<li>' + s_data[s].msg + ' <button id="delete_s_' + s + '">x</button></li>');
					document.getElementById('delete_s_' + s).addEventListener('click', function(c){
						this.removeCard(c);
					}.bind(this, s_data[s]), false);
				}

				var w_data = board.getWeaknessCards();
				for(var w = 0; w < w_data.length; w++){
					w_list.insertAdjacentHTML('afterBegin', '<li>' + w_data[w].msg + ' <button id="delete_w_' + w + '">x</button></li>');
					document.getElementById('delete_w_' + w).addEventListener('click', function(c){
						this.removeCard(c);
					}.bind(this, w_data[w]), false);
				}

				var o_data = board.getOpportunityCards();
				for(var o = 0; o < o_data.length; o++){
					o_list.insertAdjacentHTML('afterBegin', '<li>' + o_data[o].msg + ' <button id="delete_o_' + o + '">x</button></li>');
					document.getElementById('delete_o_' + o).addEventListener('click', function(c){
						this.removeCard(c);
					}.bind(this, o_data[o]), false);
				}

				var t_data = board.getThreatCards();
				for(var t = 0; t < t_data.length; t++){
					t_list.insertAdjacentHTML('afterBegin', '<li>' + t_data[t].msg + ' <button id="delete_t_' + t + '">x</button></li>');
					document.getElementById('delete_t_' + t).addEventListener('click', function(c){
						this.removeCard(c);
					}.bind(this, t_data[t]), false);
				}
			}
		};
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}
})();

// Card
function Card(type, msg){
	this.type = type;
	this.msg = msg;
}

Card.prototype.toString = function() {
	return (function(t){
				switch(t){
					case 's':
						return 'strength';
					case 'w':
						return 'weakness';
					case 'o':
						return 'opportunity';
					case 't':
						return 'threat';
					default:
						return '?';
				}
			})(this.type) + ': ' + this.msg;
}

/* ----------------------------------------------- */
/* ----------------------App---------------------- */
/* ----------------------------------------------- */

function checkEnter(){
    if(event.keyCode == 13){
        _submitCard();
    }
}

var board = SWOTBoard.getInstance();

function _submitCard() {
	board.addCard();
}
