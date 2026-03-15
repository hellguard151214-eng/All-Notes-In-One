using System;
using System.Drawing;
using System.Drawing.Imaging;

class Program
{
    static void Main(string[] args)
    {
        if (args.Length < 2) return;
        string inPath = args[0];
        string outPath = args[1];

        try
        {
            using (Bitmap bmp = new Bitmap(inPath))
            {
                // Lock bits for fast processing
                Rectangle rect = new Rectangle(0, 0, bmp.Width, bmp.Height);
                BitmapData bmpData = bmp.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                
                Bitmap result = new Bitmap(bmp.Width, bmp.Height, PixelFormat.Format32bppArgb);
                BitmapData resultData = result.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                int bytes = Math.Abs(bmpData.Stride) * bmp.Height;
                byte[] rgbValues = new byte[bytes];
                byte[] resValues = new byte[bytes];

                System.Runtime.InteropServices.Marshal.Copy(bmpData.Scan0, rgbValues, 0, bytes);

                for (int counter = 0; counter < rgbValues.Length; counter += 4)
                {
                    byte b = rgbValues[counter];
                    byte g = rgbValues[counter + 1];
                    byte r = rgbValues[counter + 2];
                    byte a = rgbValues[counter + 3];

                    // Identify green pixels
                    if (g > r + 30 && g > b + 30 && g > 70)
                    {
                        // Make transparent
                        resValues[counter] = b;
                        resValues[counter + 1] = g;
                        resValues[counter + 2] = r;
                        resValues[counter + 3] = 0;
                    }
                    else
                    {
                        resValues[counter] = b;
                        resValues[counter + 1] = g;
                        resValues[counter + 2] = r;
                        resValues[counter + 3] = a;
                    }
                }

                System.Runtime.InteropServices.Marshal.Copy(resValues, 0, resultData.Scan0, bytes);
                bmp.UnlockBits(bmpData);
                result.UnlockBits(resultData);

                result.Save(outPath, ImageFormat.Png);
                Console.WriteLine("Processed " + inPath);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error processing " + inPath + ": " + ex.Message);
        }
    }
}
