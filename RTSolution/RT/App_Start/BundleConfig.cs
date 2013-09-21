﻿using System.Web;
using System.Web.Optimization;

namespace RT
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));
            
            bundles.Add(new ScriptBundle("~/bundles/jqueryloader").Include(
                        "~/Scripts/jquery.loader.js"));
            bundles.Add(new ScriptBundle("~/bundles/jquerychannel").Include(
                        "~/Scripts/jquery.channel.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquerysignalr").Include(
            "~/Scripts/jquery.signalR-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquerynotification").Include(
            "~/Scripts/notification.js"));

            bundles.Add(new ScriptBundle("~/bundles/denomination").Include(
            "~/Scripts/denomination.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css",
                "~/Content/TableCSSCode.css",
                "~/Content/TableEditCSSCode.css"
                
                ));
            bundles.Add(new StyleBundle("~/Content/Ordercss").Include(
                "~/Content/buttons.css",
                "~/Content/navigation.css",
                "~/Content/circle.css",
                "~/Content/arrange.css",
                "~/Content/pos.css",
                
                "~/Content/orderstyles.css"
                
            ));
            bundles.Add(new StyleBundle("~/Content/themes/base/loadcss").Include(
                "~/Content/themes/base/jquery.loader.css"
                ));
            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"
                        
                        ));

        }
    }
}