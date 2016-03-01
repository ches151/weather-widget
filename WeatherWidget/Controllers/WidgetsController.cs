using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.OData;
using System.Web.OData.Results;
using WeatherWidget.Models;

namespace WeatherWidget.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using WeatherWidget.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Widget>("Widgets");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class WidgetsController : ODataController
    {
        private DataModel db = new DataModel();

        // GET: odata/Widgets
        [EnableQuery]
        public IQueryable<Widget> GetWidgets()
        {
            return db.Widgets.OrderBy(w=>w.DateCreated);
        }

        // GET: odata/Widgets(5)
        [EnableQuery]
        public SingleResult<Widget> GetWidget([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Widgets.Where(widget => widget.Id == key));
        }

        // PUT: odata/Widgets(5)
        public IHttpActionResult Put([FromODataUri] Guid key, Delta<Widget> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Widget widget = db.Widgets.Find(key);
            if (widget == null)
            {
                return NotFound();
            }

            patch.Put(widget);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WidgetExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(widget);
        }

        // POST: odata/Widgets
        public IHttpActionResult Post(Widget widget)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            widget.DateCreated = DateTime.Now;

            db.Widgets.Add(widget);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (WidgetExists(widget.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(widget);
        }

        // PATCH: odata/Widgets(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] Guid key, Delta<Widget> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Widget widget = db.Widgets.Find(key);
            if (widget == null)
            {
                return NotFound();
            }

            patch.Patch(widget);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WidgetExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(widget);
        }

        // DELETE: odata/Widgets(5)
        public IHttpActionResult Delete([FromODataUri] Guid key)
        {
            Widget widget = db.Widgets.Find(key);
            if (widget == null)
            {
                return NotFound();
            }

            db.Widgets.Remove(widget);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WidgetExists(Guid key)
        {
            return db.Widgets.Count(e => e.Id == key) > 0;
        }
    }
}
