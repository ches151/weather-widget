using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WeatherWidget.Controllers
{
    public class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var request = HttpContext.Request;
            var baseUrl = string.Format("{0}://{1}{2}"
                , request.Url.Scheme
                , request.Url.Authority
                , HttpRuntime.AppDomainAppVirtualPath == "/" 
                    ? "/" 
                    : HttpRuntime.AppDomainAppVirtualPath);

            ViewBag.BasePath = baseUrl;
        }
    }
}