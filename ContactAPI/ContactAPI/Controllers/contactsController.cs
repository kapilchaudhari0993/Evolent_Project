using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ContactAPI;

namespace ContactAPI.Controllers
{
    public class contactsController : ApiController
    {
        private ContactDatabaseEntities1 db = new ContactDatabaseEntities1();

        // GET: api/contacts
        public IQueryable<contact> Getcontacts()
        {
            return db.contacts;
        }

        // GET: api/contacts/5
        [ResponseType(typeof(contact))]
        public IHttpActionResult Getcontact(int id)
        {
            contact contact = db.contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/contacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putcontact(int id, contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contact.id)
            {
                return BadRequest();
            }

            db.Entry(contact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!contactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/contacts
        [ResponseType(typeof(contact))]
        public IHttpActionResult Postcontact(contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.contacts.Add(contact);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (contactExists(contact.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = contact.id }, contact);
        }

        // DELETE: api/contacts/5
        [ResponseType(typeof(contact))]
        public IHttpActionResult Deletecontact(int id)
        {
            contact contact = db.contacts.Find(id);
            if (contact == null)
            {
                return NotFound();
            }

            db.contacts.Remove(contact);
            db.SaveChanges();

            return Ok(contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool contactExists(int id)
        {
            return db.contacts.Count(e => e.id == id) > 0;
        }
    }
}