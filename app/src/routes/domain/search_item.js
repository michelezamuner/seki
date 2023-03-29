export default class SearchItem {
  constructor(route) {
    this._id = route.id;
    this._name = route.name;
    this._elevation = route.elevation;
    this._distance = route.distance;
    this._time = route.time;
    this._references = route.references.join(' ');
    this._peakName = route.peaks.map(peak => peak.name).join(' ');
    this._peakMax = route.peaks.length ? route.peaks.sort((a, b) => a.elevation > b.elevation)[0].elevation : 0;
    this._area = route.peaks.map(peak => peak.superGroup).join(' ');
    this._done = route.peaks.find(peak => peak.done) !== undefined ? 'true' : 'false';
    this._difficulty = (diff => {
      switch (true) {
      case diff === 'E': return 'E';
      case diff.startsWith('EEA'): return 'EEA';
      case diff.startsWith('EE'): return 'EE';
      default: return 'T';
      }
    })(route._difficulty);
    this._notes = route.notes;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get elevation() {
    return this._elevation;
  }

  get distance() {
    return this._distance;
  }

  get time() {
    return this._time;
  }

  get references() {
    return this._references;
  }

  get peakName() {
    return this._peakName;
  }

  get peakMax() {
    return this._peakMax;
  }

  get area() {
    return this._area;
  }

  get done() {
    return this._done;
  }

  get difficulty() {
    return this._difficulty;
  }

  get notes() {
    return this._notes;
  }
}
