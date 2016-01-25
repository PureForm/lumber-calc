var LumberCalc = function () {
	// Nominal Dimensions, in inches
	this.dimensions	= ['1x2','1x3','1x4','1x6','1x8','1x10','1x12','2x2','2x3','2x4','2x6','2x8','2x10','2x12','4x4','4x6','4x8','6x6','8x8'];
	this.kerfWidth	= 0.125; // 1/8"

	var depth_48	= 48.0;  // 4'
	var depth_72	= 72.0;  // 6'
	var depth_96	= 96.0;  // 8'
	var depth_120	= 120.0; // 10'
	var depth_144	= 144.0; // 12'
	var depth_168	= 168.0; // 14'
	var depth_192	= 192.0; // 16'
	var depth_216	= 216.0; // 18'
	var depth_240	= 240.0; // 20'
	var depth_264	= 264.0; // 22'
	var depth_288	= 288.0; // 24'

	// Stud depths
	var depth_92_625	= 92.625;  // 8'
	var depth_104_625	= 104.625; // 9'
	var depth_116_625	= 116.625; // 10'

	// http://www.homedepot.com/b/Lumber-Composites-Framing-Lumber-Studs-Dimensional-Lumber/N-5yc1vZc55w
	this.depthMap = {
		'1x2':	[depth_72,depth_96,depth_120],
		'1x3':	[depth_72,depth_96,depth_120,depth_144],
		'1x4':	[depth_72,depth_96,depth_120],
		'1x6':	[depth_72,depth_96,depth_120,depth_144],
		'1x8':	[depth_72,depth_96,depth_120,depth_144],
		'1x10':	[depth_72,depth_96,depth_120],
		'1x12':	[depth_48,depth_72,depth_96],
		'2x2':	[depth_96,depth_144],
		'2x3':	[depth_96],
		'2x4':	[depth_96,depth_120,depth_144,depth_168,depth_192,depth_240],
		'2x6':	[depth_96,depth_120,depth_144,depth_168,depth_192,depth_240],
		'2x8':	[depth_96,depth_120,depth_144,depth_168,depth_192,depth_240],
		'2x10':	[depth_96,depth_120,depth_144,depth_192,depth_240],
		'2x12':	[depth_96,depth_120,depth_144,depth_192,depth_240,depth_288],
		'4x4':	[depth_96,depth_120],
		'4x6':	[depth_96,depth_120],
		'4x8':	[],
		'6x6':	[],
		'8x8':	[]
	};
	this.data = {
		ids:		[],
		records:	{}
	}
};

LumberCalc.prototype.load = function (data) {
	this.data = data;
};

LumberCalc.prototype.getResults = function (id) {
	var sets = {};

	_.forEach(this.data.records,function(record,id) {
		if (record.dimensions == null) return;

		if (sets[record.dimensions] == null) {
			sets[record.dimensions] = [];
		}

		sets[record.dimensions].push(record);
	});


/*

Start with larger depths first, remember remainders
	see if some cuts fit better into smaller pieces
		remember ratios of each depth, use the one which yields the smallest remainder
use remainders for other cuts
see iof other cuts fit well into larger initial cuts

so if an 8.5' cut fits into a 10' board without much waste, but 2.5' cuts are needed, a 12' board is more appropriate.

*/

console.log(sets);

/*

{
  "ids": [
    "DataStore1",
    "DataStore2"
  ],
  "records": {
    "DataStore1": {
      "title": "2",
      "quantity": "13",
      "dimensions": "2x4",
      "depth": null,
      "id": "DataStore1"
    },
    "DataStore2": {
      "title": "3",
      "quantity": "333",
      "dimensions": "2x6",
      "depth": null,
      "id": "DataStore2"
    }
  }
}

*/
};