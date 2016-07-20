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
import BaseServiceTracking from 'ember-performance-tracking/services/performance-tracking';

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
The transitionData contains the destination route name and the destination pathname. The AJAX calls performed between
the start and end of the transition will also be included in the resources attribute of the object. The objects in the
resources array include the duration and the startTime offset from the navigation start from the performance api. 

If the browser supports the performance api, the timings are [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) which is basically in milliseconds, otherwise (new Date()).getTime() is used which is also in milliseconds
* **duration:** Time in milliseconds from the start of the transition to the end of the transition
* **end:** Time offset from navigation start from the performance api
* **isInitial:** Indicates if the data is for a hard load (downloading html and static assets) or soft load.
* **start:** Time offset from navigation start from the performance api
* **startTimestamp:** Timestamp in milliseconds of the start of the transition

```js
{
    destinationRoute: "some-parent.child-route.index",
    duration: 7661.005000000002,                         //DOMHighResTimeStamp (milliseconds)
    end: 8364.785000000002,                              //DOMHighResTimeStamp (milliseconds)
    isInitial: true,
    resources: [{
        duration: 523,                                   //DOMHighResTimeStamp (milliseconds)
        name: "http://ajaxHostName.com/resource",
        startTime: 772                                   //DOMHighResTimeStamp (milliseconds)
      }, ...
    ],
    start: 703.7800000000001,                            //DOMHighResTimeStamp (milliseconds)
    startTimestamp: 1455168547958,                       //Timestamp in milliseconds since epoch
    url: "/some-parent/child-route/"
}
```

## License
This addon is released under the MIT License.
