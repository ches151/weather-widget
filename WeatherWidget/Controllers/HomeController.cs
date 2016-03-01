using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WeatherWidget.Models;

namespace WeatherWidget.Controllers
{
    public class HomeController : BaseController
    {
        private DataModel db = new DataModel();

        // GET: Home
        public ActionResult Index()
        {
            return View(db.Widgets.OrderBy(w=>w.DateCreated).ToList());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
