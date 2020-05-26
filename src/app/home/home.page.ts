import { Component } from '@angular/core';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  beaconRegion: any;
  bname: any;

  constructor(public beacon: IBeacon, public plt: Platform) {
    this.plt.ready().then(() => {
    this.beacon.isBluetoothEnabled().then((s) => {
      console.log(s);
      // alert(s);
      if (s === false) {
        this.beacon.enableBluetooth().then(s1 => {
          // alert('Enabled Bluetooth');
        }, f => {
          alert(f);
        });
      }
    }, fail => {
      alert(fail);
    });
    // create a new delegate and register it with the native layer
    let delegate = this.beacon.Delegate();
    this.beacon.setDelegate(delegate);
    // Request permission to use location on iOS
    this.beacon.requestAlwaysAuthorization();
    });
  }

  setname() {
    console.log(this.bname);
    alert('Name Added');
}

  advertise() {
    var uuid = '00000000-0000-0000-0000-000000000000';
    var identifier = this.bname;
    var minor = 2000;
    var major = 5;
    let beacon = this.beacon.BeaconRegion(identifier, uuid, major, minor);
    var delegate = this.beacon.Delegate();
    delegate.peripheralManagerDidStartAdvertising().subscribe((pluginres) => {
      console.log('Peripheral Advertising : ' + JSON.stringify(pluginres));
    });
    delegate.peripheralManagerDidUpdateState().subscribe(plu => {
      console.log('Peripheral Update : ' + JSON.stringify(plu));
    });
    this.beacon.setDelegate(delegate);

      this.beacon.isAdvertisingAvailable().then((suc) => {
        if (suc === true) {
          this.beacon.startAdvertising(beacon).then(s => {
            alert('started');
            console.log('start');
            console.log(s);
          }, f => {
            alert(f);
            console.log('stop');
            console.log(f);
          });      
        } else {
          alert('BLE Advertising is NOT Supportive');
        }
      }, fa => {
        console.log(fa);
      });
    }

  isAdvertisin() {
    this.beacon.isAdvertising().then((suc) => {
      alert(suc);
      console.log('advertisings' + suc);
    }, fa => {
      console.log(fa);
    });
  }

  stop() {
    this.beacon.stopAdvertising(this.beaconRegion).then(s => {
      alert('stopped');
      console.log('Stooped');
      console.log(s);
    }, fail => {
      alert(fail);
    });
  }

  // advertise1() {
//   var uuid = '00000000-0000-0000-0000-000000000000';
//   var identifier = this.bname;
//   var minor = 2000;
//   var major = 5;
//   var beacon = new (window as any).cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
//   (window as any).cordova.plugins.locationManager.startAdvertising(beacon).then(s => {
//     alert('started');
//     console.log('start');
//     console.log(s);
//   }, f => {
//     alert(f);
//     console.log('stop');
//     console.log(f);
//   });
// }

}
