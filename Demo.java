package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.regex.Matcher;

public class Demo {

	public static void main(String[] args) {
		StringBuilder sb = new StringBuilder();
		BufferedReader br = null;
		PrintWriter pw = null;
		try {
			br = new BufferedReader(new FileReader(new File("C:/Users/刘开/Desktop/1.txt")));
			String read = "";
			while ((read = br.readLine()) != null) {
				sb.append(read + "\n");
			}
			String str = sb.toString();
			System.out.println(str);
			str = str.replaceAll("\\$\\$\\d\\\\\\|\\\\\\|\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\\\\\|\\\\\\|", " ");
			System.out.println(str);
			//pw = new PrintWriter(new FileWriter("C:/Users/刘开/Desktop/result.txt"));
			//pw.println(str);
			OutputStreamWriter output=new OutputStreamWriter(new FileOutputStream("C:/Users/刘开/Desktop/result2.txt"), "utf-8");
			output.write(str);

			output.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				br.close();
			//	pw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

		// 测试
		String str = "$$1\\|\\|2017-08-04 10:00:19\\|\\|eeee554";
		str = str.replaceAll("^\\$\\$\\d\\\\\\|\\\\\\|\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\\\\\|\\\\\\|", " ");
		System.out.println(str);

		str = "系统提示:柔柔弱弱ggt 99 jj (09 .'';opkkkkksaa$那你呢6666";
		// str = str.replaceAll("^系统提示:[\u4e00-\u9fa5]+", "");//匹配汉字 str = str.replaceAll("系统提示[^\\$]+", " ");
		System.out.println(str);

	}

}
