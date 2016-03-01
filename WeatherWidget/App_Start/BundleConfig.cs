using System.Web;
using System.Web.Optimization;

namespace WeatherWidget
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/angular/angular.js",
                        "~/Scripts/angular/angular-resource.js",
                        "~/Scripts/angular/angular-route.js",
                        "~/Scripts/angular/angular-messages.js",
                        "~/Scripts/angular-material/angular-material.js",
                        "~/Scripts/angular-aria/angular-aria.js",
                        "~/Scripts/angular-animate/angular-animate.js"));
            bundles.Add(new ScriptBundle("~/bundles/widget-editor").Include(
                        "~/widget-editor/widget-editor.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Scripts/angular/angular-csp.css",
                "~/Content/angular-material.css",
                "~/Content/angular-material.layouts.css",
                "~/Content/Site.css"));
        }
    }
}