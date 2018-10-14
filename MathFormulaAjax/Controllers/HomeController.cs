using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MathFormulaAjax.ViewModels;

namespace MathFormulaAjax.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            var viewModel = new MathFormulaViewModel();

            return View(viewModel);
        }


        [HttpPost]
        public ActionResult GetValueById(MathFormulaViewModel response)
        {
            return Json(response.GetValue());
        }


        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}
    }
}