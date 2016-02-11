# Ember Performance Tracking

Ember performance tracking is a lightweight library for getting transition times from start of a transition to the final route.

## Installation
Installing the library is as easy as:
```bash
ember install ember-performance-tracking
ember g perf-tracking-service perf-tracking-service
```

### Basic Usage
Once you finish installing, you will see a **service** generated in your app folder. This service extends the base class from the addon and gives you access to the transition data once a transition is complete. **Make sure to not change the file name.**
```js
import BaseServiceTracking from 'ember-cli-performance-tracking/services/performance-tracking';

export default BaseServiceTracking.extend({
  /**
   * OVERRIDE FUNCTION
   * 
   * @param  {Object} transitionData Object containing transition timing data
   */
  transitionComplete: function (transitionData) {
    // MODIFY HERE
  }
});
```

### Transition Data Example
```js
{
    destinationRoute: "some-parent.child-route.index",
    duration: 7661.005000000002,
    end: 8364.785000000002,
    resources: [
        duration: 523
        name: "http://ajaxHostName.com/resource"
        startTime: 772
    ],
    start: 703.7800000000001,
    startTimestamp: 1455168547958,
    url: "/some-parent/child-route/"
}
```

## License
This addon is released under the MIT License.