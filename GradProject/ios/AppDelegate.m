#import <GoogleMaps/GoogleMaps.h>  //ADD THIS
@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [GMSServices provideAPIKey:@"AIzaSyDwDENMUesiIxkFv_0EkVskbOe85fEvXm4"]; //ADD THIS
}