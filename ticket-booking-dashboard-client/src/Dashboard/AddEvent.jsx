import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import SectionTitle from "../components/SectionTitle/SectionTitle";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddEvent = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, ticketPrice, email, eventDetails } = data;
          const newItem = {
            name,
            price: parseFloat(ticketPrice),
            email,
            image: imgURL,
            eventDetails,
          };
          console.log(newItem);
          axiosSecure.post('http://localhost:5000/addEvent', newItem)
          .then(data => {
            console.log('After posting new menu item', data.data);
            if(data.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item added successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
          })
        }
      });
  };

  return (
    <div className=" text-white">
      <SectionTitle
        subHeading={"What's new?"}
        heading={"ADD Event"}
      ></SectionTitle>
      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-12 rounded-lg"
        >
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Event Name*</span>
            </div>
            <input
              type="text"
              placeholder="Type Here The Event Name"
              {...register("name", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </label>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 text-white">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Your Email*</span>
            </div>
            <input
              type="text"
              placeholder="Type Here Your Email"
              {...register("email", { required: true, maxLength: 120 })}
              defaultValue={user?.email}
              className="input input-bordered w-full text-white"
            />
          </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Ticket Price*</span>
              </div>
              <input
                type="number"
                placeholder="Event Price"
                {...register("ticketPrice", { required: true, maxLength: 20 })}
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Event Image*</span>
            </div>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full "
            />
          </label>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Event Details</span>
            </div>
            <textarea
              {...register("eventDetails", { required: true, maxLength: 200 })}
              className="textarea textarea-bordered h-24"
              placeholder="Type Here of Event Details"
            ></textarea>
          </label>
          
          <input
            type="submit"
            className="btn btn-sm mt-8 bg-green-600 text-white font-semibold text-lg px-8"
            value="Add Event"
          />
        </form>
      </div>
    </div>
  );
};

export default AddEvent;