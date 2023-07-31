const ChooseImg = ({ image, setImage }) => {
  return (
    <div className="newp-choose-img">
      <div className="newp-img-container">
        <input
          type="file"
          id="newp-choose-input"
          name="newp-choose-input"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label
          htmlFor="newp-choose-input"
          className="newp-img-label"
          style={{ display: image && "none" }}
        >
          Upload Image
        </label>
      </div>

      {image && (
        <img
          src={image.name ? URL.createObjectURL(image) : image}
          alt=""
          className="newp-img-view"
        />
      )}
    </div>
  );
};

export default ChooseImg;
