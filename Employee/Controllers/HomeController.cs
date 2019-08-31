using System.Web.Mvc;
using Employee.Models;

namespace Employee.Controllers
{
    public class HomeController : Controller
    {
        private EmployeeEntities context = new EmployeeEntities();

        public ActionResult Index()
        {
            return View(context.Employees);
        }
    }
}