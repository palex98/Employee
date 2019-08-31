using Employee.Models;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Employee.Controllers
{
    public class DataController : ApiController
    {
        public void Post([FromBody]Employees record)
        {
            using (EmployeeEntities context = new EmployeeEntities())
            {
                context.Employees.Add(record);
                context.SaveChanges();
            }
        }

        public void Patch([FromBody]Employees record)
        {
            using (EmployeeEntities context = new EmployeeEntities())
            {
                var item = context.Employees.FirstOrDefault(i => i.Id == record.Id);
                if (item != null)
                {
                    item.firstName = record.firstName;
                    item.lastName = record.lastName;
                    item.salary = record.salary;
                    item.manager = record.manager;
                    context.SaveChanges();
                }
                else throw new HttpException(400, "Record not found");
            }
        }

        public void Delete(int id)
        {
            using (EmployeeEntities context = new EmployeeEntities())
            {
                var item = context.Employees.FirstOrDefault(i => i.Id == id);
                if (item != null)
                {
                    context.Employees.Remove(item);
                    context.SaveChanges();
                }
                else throw new HttpException(400, "Record not found");
            }
        }
    }
}