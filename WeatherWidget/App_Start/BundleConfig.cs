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
                        "~/Scripts/angular/angular-resource.js"));
            bundles.Add(new ScriptBundle("~/bundles/widget-editor").Include(
                        "~/Scripts/widget-editor.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Scripts/angular/angular-csp.css",
                "~/Content/Site.css"));
        }
    }
}